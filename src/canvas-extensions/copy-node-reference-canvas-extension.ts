import {Canvas} from 'src/@types/Canvas'
import CanvasHelper, {MenuOption} from 'src/utils/canvas-helper'
import CanvasExtension from './canvas-extension'
import {Notice} from 'obsidian'

export default class CopyNodeReferenceCanvasExtension extends CanvasExtension {

  isEnabled() { return true }

  init() {
    this.plugin.registerEvent(this.plugin.app.workspace.on('advanced-canvas:popup-menu-created',
      (canvas: Canvas) => this.onPopupMenuCreated(canvas)
    ))
  }

  private onPopupMenuCreated(canvas: Canvas): void {
    const selectionNodeData = canvas.getSelectionData().nodes
    if (canvas.readonly || selectionNodeData.length !== 1) return

    const menuOption: MenuOption = {
      id: 'node-popup-menu-option-copy-reference',
      label: 'Copy reference',
      icon: 'copy',
      callback: () => {
        const selectedNode = selectionNodeData[0]
        const ref = `[[${canvas.view.file.path}#${selectedNode.id}]]`

        navigator.clipboard.writeText(ref).then(() => {
          new Notice('Reference copied to clipboard')
        }).catch((err) => {
          new Notice('Failed to copy reference')
          console.error(err)
        })
      }
    }

    CanvasHelper.addPopupMenuOption(canvas, CanvasHelper.createPopupMenuOption(menuOption))
  }

}
