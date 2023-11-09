/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module table/utils/ui/widget
 */
import type { ViewDocumentSelection, ViewElement } from 'ckeditor5/src/engine';
/**
 * Returns a table widget editing view element if one is selected.
 */
export declare function getSelectedTableWidget(selection: ViewDocumentSelection): ViewElement | null;
/**
 * Returns a table widget editing view element if one is among the selection's ancestors.
 */
export declare function getTableWidgetAncestor(selection: ViewDocumentSelection): ViewElement | null;
