'use babel';

import { CompositeDisposable } from 'atom';
import extract from './extract';
import patch from './patch';
import accept from './accept';

export default {
	subscriptions: null,

	activate( state ) {
		this.subscriptions = new CompositeDisposable();
		this.subscriptions.add( atom.commands.add( 'atom-workspace', {
			'amd-dependency-edit:toggle': () => this.toggle()
		} ) );
	},

	deactivate() {
		this.subscriptions.dispose();
	},

	serialize() {
	},

	toggle() {
		const sub = new CompositeDisposable();
		const amdPane = atom.workspace.getActivePane();
		const amdEditor = amdPane.activeItem;

		amdPane.splitRight();
		atom.workspace.open()
			.then(cmdEditor => {
				const content = amdEditor.getText();
				const extracted = extract( content );
				cmdEditor.setText( extracted );

				sub.add( amdEditor.onDidStopChanging( () => {
					console.log( 'left did change called' );
					const content = amdEditor.getText();
					const extracted = extract( content );

					const activeTextEditor = atom.workspace.getActiveTextEditor();

					// 如果改动来自激活的非当前窗口
					if( activeTextEditor && activeTextEditor.id !== cmdEditor.id ) {
						cmdEditor.setText( extracted );
					}
				} ) );

				sub.add( cmdEditor.onDidStopChanging( () => {
					console.log( 'right did change called' );
					const content = cmdEditor.getText();
					const p = patch( content );

					const activeTextEditor = atom.workspace.getActiveTextEditor();
					if( activeTextEditor && activeTextEditor.id !== amdEditor.id ) {
						const accepted = accept( amdEditor.getText(), p );
						if( !( accepted instanceof Error ) ) {
							amdEditor.setText( accepted + '' );
						}
					}
				} ) );

				cmdEditor.onDidDestroy( () => {
					sub.dispose();
				} );
			});
	}
};
