import { cn } from "./utils"

export type AspectRatio = "16-9" | "5-3" | "1-1" | "4-3"

interface CollectionCardRules {
  aspectRatio: AspectRatio
  hideOnMobile: boolean
  hideOnTablet: boolean
}

export function getCollectionCardRules(
  totalColumns: number,
  index: number
): CollectionCardRules {
  // Default rules for most layouts
  const defaultRules: CollectionCardRules = {
    aspectRatio: "16-9",
    hideOnMobile: false,
    hideOnTablet: false,
  }

  // Special rules for specific layouts
  if (totalColumns === 1) {
    return {
      aspectRatio: "16-9",
      hideOnMobile: false,
      hideOnTablet: false,
    }
  }

  if (totalColumns === 2) {
    return {
      aspectRatio: index === 0 ? "5-3" : "5-3",
      hideOnMobile: false,
      hideOnTablet: false,
    }
  }

  if (totalColumns === 3) {
    // First item: 5-3 on all screens
    // Other items: 16-9, hide on tablet
    if (index === 0) {
      return {
        aspectRatio: "5-3",
        hideOnMobile: false,
        hideOnTablet: false,
      }
    }
    return {
      aspectRatio: "16-9",
      hideOnMobile: false,
      hideOnTablet: index > 0,
    }
  }

  if (totalColumns === 5) {
    // First item spans wider with 5-3 ratio
    // Rest are 16-9 with progressive hiding
    if (index === 0) {
      return {
        aspectRatio: "5-3",
        hideOnMobile: false,
        hideOnTablet: false,
      }
    }
    return {
      aspectRatio: "16-9",
      hideOnMobile: false,
      hideOnTablet: index > 2,
    }
  }

  return defaultRules
}

export function getCollectionSectionLayout(
  totalColumns: number
): string {
  const baseClasses = "grid w-full gap-4"

  if (totalColumns === 1) {
    return cn(baseClasses, "grid-cols-1")
  }

  if (totalColumns === 2) {
    return cn(baseClasses, "grid-cols-1 md:grid-cols-2")
  }

  if (totalColumns === 3) {
    return cn(baseClasses, "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
  }

  if (totalColumns === 5) {
    return cn(
      baseClasses,
      "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      "[&>:first-child]:col-span-2 md:[&>:first-child]:col-span-2 lg:[&>:first-child]:col-span-1"
    )
  }

  return baseClasses
}
