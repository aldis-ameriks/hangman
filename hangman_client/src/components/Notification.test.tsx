import React from 'react';
import { render } from 'react-testing-library';
import Notification, { NotificationType } from './Notification';

describe('Notification', () => {
  ['error', 'success', 'warning', 'info'].forEach(variant => {
    it(`${variant} is rendered correctly`, () => {
      const component = render(
        <Notification variant={variant as NotificationType}>
          <div>Child</div>
        </Notification>,
      );
      expect(component.getByText('Child')).toBeInTheDocument();
      expect(component.getByTestId('icon')).toBeInTheDocument();
    });
  });
});
