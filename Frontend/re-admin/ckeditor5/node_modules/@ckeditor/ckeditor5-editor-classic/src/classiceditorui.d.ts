/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module editor-classic/classiceditorui
 */
import type { Editor } from 'ckeditor5/src/core';
import { EditorUI } from 'ckeditor5/src/ui';
import type ClassicEditorUIView from './classiceditoruiview';
/**
 * The classic editor UI class.
 */
export default class ClassicEditorUI extends EditorUI {
    /**
     * The main (top–most) view of the editor UI.
     */
    readonly view: ClassicEditorUIView;
    /**
     * A normalized `config.toolbar` object.
     */
    private readonly _toolbarConfig;
    /**
     * The element replacer instance used to hide the editor's source element.
     */
    private readonly _elementReplacer;
    /**
     * Creates an instance of the classic editor UI class.
     *
     * @param editor The editor instance.
     * @param view The view of the UI.
     */
    constructor(editor: Editor, view: ClassicEditorUIView);
    /**
     * @inheritDoc
     */
    get element(): HTMLElement | null;
    /**
     * Initializes the UI.
     *
     * @param replacementElement The DOM element that will be the source for the created editor.
     */
    init(replacementElement: HTMLElement | null): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Initializes the editor toolbar.
     */
    private _initToolbar;
    /**
     * Enable the placeholder text on the editing root.
     */
    private _initPlaceholder;
    /**
     * Provides an integration between the sticky toolbar and {@link module:utils/dom/scroll~scrollViewportToShowTarget}.
     * It allows the UI-agnostic engine method to consider the geometry of the
     * {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#stickyPanel} that pins to the
     * edge of the viewport and can obscure the user caret after scrolling the window.
     *
     * @param evt The `scrollToTheSelection` event info.
     * @param data The payload carried by the `scrollToTheSelection` event.
     * @param originalArgs The original arguments passed to `scrollViewportToShowTarget()` method (see implementation to learn more).
     */
    private _handleScrollToTheSelectionWithStickyPanel;
}
