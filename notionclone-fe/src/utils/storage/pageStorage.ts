import type { PageState } from "../../types/page";
import {
  welcomeId,
  NOTION_WELCOME_CONTENT,
} from "../../constants/notionWelcome";
import { PAGE_STORAGE_KEY } from "../../constants/localStorageKey";

export const loadInitialPageState = (): PageState => {
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(PAGE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PageState;
        return parsed;
      }
    } catch (error) {
      console.warn("Failed to load pages from storage", error);
    }
  }

  // Initially one basic page
  const now = new Date().toISOString();

  return {
    pages: {
      [welcomeId]: {
        id: welcomeId,
        parentId: null,
        title: "Notion에 오신 것을 환영합니다!",
        icon: "👋",
        blocks: NOTION_WELCOME_CONTENT,
        createdAt: now,
        updatedAt: now,
      },
    },
    rootIds: [welcomeId],
    activeId: welcomeId,
  };
};

export const savePageState = (state: PageState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PAGE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save pages to storage", error);
  }
};
