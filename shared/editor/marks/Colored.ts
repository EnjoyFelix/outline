import { MarkSpec, MarkType } from "prosemirror-model";
import markInputRule from "../lib/markInputRule";
import markRule from "../rules/mark";
import Mark from "./Mark";

export default class Colored extends Mark {
  /** The colors that can be used for highlighting */
  static colors = [
    "#e84336",
    "#f16637",
    "#f8a232",
    "#f4c64f",
    "#f5ee4b",
    "#d1e04c",
    "#74b856",
    "#2d9dd1",
    "#506cb2",
    "#58439a",
    "#8a499e",
    "#c22551",
  ];

  /** The names of the colors that can be used for highlighting, must match length of array above */
  static colorNames = [
    "Red",
    "Tangerine",
    "Orange",
    "Beige",
    "Yellow",
    "Lime",
    "Cactus",
    "Aquamarine",
    "Blue",
    "Dark blue",
    "Purple",
    "Bordeaux",
  ];

  get name() {
    return "colored";
  }

  get schema(): MarkSpec {
    return {
      attrs: {
        color: {
          default: null,
        },
      },
      parseDOM: [
        {
          tag: "colored",
          getAttrs: (dom) => {
            const color = dom.getAttribute("data-color") || "";

            return {
              color: Colored.colors.includes(color) ? color : null,
            };
          },
        },
      ],
      toDOM: (node) => [
        "color",
        {
          "data-color": node.attrs.color,
          style: `color: ${node.attrs.color ?? "#000000"}`,
        },
      ],
    };
  }

  inputRules({ type }: { type: MarkType }) {
    return [markInputRule(/(?:\+\+\+)([^=]+)(?:\+\+\+)$/, type)];
  }

  // keys({ type }: { type: MarkType }) {
  //   return {
  //     "Mod-Ctrl-k": toggleMark(type),
  //   };
  // }

  get rulePlugins() {
    return [markRule({ delim: "+++", mark: "colored" })];
  }

  toMarkdown() {
    return {
      open: "+++",
      close: "+++",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "colored" };
  }
}
