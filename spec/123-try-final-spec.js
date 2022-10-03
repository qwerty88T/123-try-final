'use babel';

import 123TryFinal from '../lib/123-try-final';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('123TryFinal', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('123-try-final');
  });

  describe('when the 123-try-final:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.123-try-final')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, '123-try-final:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.123-try-final')).toExist();

        let 123TryFinalElement = workspaceElement.querySelector('.123-try-final');
        expect(123TryFinalElement).toExist();

        let 123TryFinalPanel = atom.workspace.panelForItem(123TryFinalElement);
        expect(123TryFinalPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, '123-try-final:toggle');
        expect(123TryFinalPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.123-try-final')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, '123-try-final:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let 123TryFinalElement = workspaceElement.querySelector('.123-try-final');
        expect(123TryFinalElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, '123-try-final:toggle');
        expect(123TryFinalElement).not.toBeVisible();
      });
    });
  });
});
