// extensions/FontSize.ts
import { Mark, mergeAttributes } from '@tiptap/core';

export interface FontSizeOptions {
  types: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}

export const FontSize = Mark.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return {
            style: `font-size: ${attributes.style}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'font-size',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark(this.name, { style: size });
        },
    };
  },
});
