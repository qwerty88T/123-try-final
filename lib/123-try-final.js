'use babel';

import 123TryFinalView from './123-try-final-view';
import { CompositeDisposable } from 'atom';

export default {

  123TryFinalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.123TryFinalView = new 123TryFinalView(state.123TryFinalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.123TryFinalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      '123-try-final:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.123TryFinalView.destroy();
  },

  serialize() {
    return {
      123TryFinalViewState: this.123TryFinalView.serialize()
    };
  },

  toggle() {
    console.log('123TryFinal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
