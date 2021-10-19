import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from '@wix/wix-i18n-config';
import i18n from '../__mocks__/i18n';
import App from './App';
import DataHooks from './DataHooks';

import {
  InputTestkit,
  TextTestkit,
  ButtonTestkit,
} from 'wix-style-react/dist/testkit';

const renderApp = () =>
  render(
    <Suspense fallback="...loading">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>,
  );

describe('App', () => {
  it('submit correct data when all required fields exists', async () => {
    const { baseElement } = renderApp();
    const firstNameInputDriver = InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FIRST_NAME_INPUT,
    });

    await firstNameInputDriver.enterText('Ariel');

    const lastNameInputDriver = InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.LAST_NAME_INPUT,
    });

    await lastNameInputDriver.enterText('Hadad');

    const submitButtonDriver = ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SUBMIT_BUTTON,
    });

    await submitButtonDriver.click();

    const savedFirstNameDriver = TextTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SAVED_FIRST_NAME_INPUT,
    });

    const savedDataExists = await savedFirstNameDriver.exists();

    expect(savedDataExists).toEqual(true);

    const savedDataText = await savedFirstNameDriver.getText();
    expect(savedDataText).toEqual('Ariel');
  });

  it('submit data without required fields will not save the data', async () => {
    const { baseElement } = renderApp();
    const firstNameInputDriver = InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FIRST_NAME_INPUT,
    });

    await firstNameInputDriver.enterText('Ariel');

    const submitButtonDriver = ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SUBMIT_BUTTON,
    });

    await submitButtonDriver.click();

    const savedFirstNameDriver = TextTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.SAVED_FIRST_NAME_INPUT,
    });

    const savedDataExists = await savedFirstNameDriver.exists();

    expect(savedDataExists).toEqual(false);
  });

  it('Clear the form', async () => {
    const { baseElement } = renderApp();
    const firstNameInputDriver = InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.FIRST_NAME_INPUT,
    });

    await firstNameInputDriver.enterText('Ariel');

    const firstNameText = await firstNameInputDriver.getText();
    expect(firstNameText).toEqual('Ariel');

    const lastNameInputDriver = InputTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.LAST_NAME_INPUT,
    });

    await lastNameInputDriver.enterText('Hadad');

    const clearButtonDriver = ButtonTestkit({
      wrapper: baseElement,
      dataHook: DataHooks.CLEAR_BUTTON,
    });
    await clearButtonDriver.click();

    const firstNameTextAfterClear = await firstNameInputDriver.getText();
    expect(firstNameTextAfterClear).toEqual('');

    const lastNameTextAfterClear = await lastNameInputDriver.getText();
    expect(lastNameTextAfterClear).toEqual('');
  });
});
