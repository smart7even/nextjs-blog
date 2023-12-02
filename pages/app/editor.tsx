import '@mdxeditor/editor/style.css'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    UndoRedo,
    BoldItalicUnderlineToggles,
} from "@mdxeditor/editor";
import { JSX, RefAttributes } from 'react';

export default function EditorPage(props: JSX.IntrinsicAttributes & MDXEditorProps & RefAttributes<MDXEditorMethods>) {
    return (
        <MDXEditor markdown='# Hello world' plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
            toolbarContents: () => (<> <UndoRedo /><BoldItalicUnderlineToggles /></>)
        })]} />
    )

}