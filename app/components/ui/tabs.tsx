"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

type TabsProps = {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  children, 
  onValueChange, 
  className 
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onValueChange?.(tab)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('useTabsContext must be used within a Tabs component')
  }
  return context
}

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", 
        className
      )}
    >
      {children}
    </div>
  )
}

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = useTabsContext()

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
        activeTab === value 
          ? "bg-background text-foreground shadow-sm" 
          : "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) return null

  return (
    <div 
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", 
        className
      )}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
