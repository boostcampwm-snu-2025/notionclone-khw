import { BlockNoteEditor } from "@blocknote/core";

export const newPageSlashItem = (
  editor: BlockNoteEditor,
  onCreatePage?: () => void
) => ({
  title: "새 페이지",
  aliases: ["page"],
  group: "Navigation",
  subtext: "새 빈 페이지를 만들기",
  onItemClick: async () => {
    onCreatePage?.();

    await editor.replaceBlocks(editor.document, [
      {
        type: "heading",
        props: { level: 1 },
        content: [
          {
            type: "text",
            text: "제목 없는 페이지",
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "",
            styles: {},
          },
        ],
      },
    ]);
  },
});
