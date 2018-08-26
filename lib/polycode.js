'use babel';

import { CompositeDisposable } from 'atom'
const { execSync } = require('child_process');

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'polycode:translate': () => this.translate(),
      'polycode:untranslate': () => this.untranslate(),
      'polycode:definition': () => this.definition()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  translate() {
    console.log(`cd ${atom.project.rootDirectories[0].path}/ && polycode translate`)
    execSync(`cd ${atom.project.rootDirectories[0].path}/ && polycode translate`);
    atom.notifications.addSuccess('Translated your code!')
  },

  untranslate() {
    console.log(`cd ${atom.project.rootDirectories[0].path}/ && polycode untranslate`)
    execSync(`cd ${atom.project.rootDirectories[0].path}/ && polycode untranslate`);
    atom.notifications.addSuccess('Returned files to the original language!')
  },

  definition() {
    let editor
    let self = this
    if (editor = atom.workspace.getActiveTextEditor()) {
      const filePath = atom.workspace.getActivePaneItem().buffer.file.path.replace(atom.project.rootDirectories[0].path, "")
      let query = editor.getSelectedText();
      if (!query) {
        return
      }
      var result = execSync(`cd ${atom.project.rootDirectories[0].path}/ && polycode definition -s ${filePath} -w ${query}`);
      atom.notifications.addInfo(query);
    }
  },
};
