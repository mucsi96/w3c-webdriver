/* eslint-env jest */

'use strict';

const sessionProvider = require('./session-provider');

const session = sessionProvider.session;

describe('Element', () => {
    describe('getText method', () => {
        it('should return text from element', async () => {
            const element = await session.findElement('css', 'h2');
            const text = await element.getText();
            expect(text).toEqual('Simple calculator');
        });
    });

    describe('click method', () => {
        it('should simulate mouse click on element', async () => {
            const addButton = await session.findElement('css', '#add');
            await addButton.click();
            const result = await session.findElement('css', '#result');
            const text = await result.getText();
            expect(text).toEqual('NaN');
        });
    });

    describe('sendKeys method', () => {
        it('should simulate typing in element', async () => {
            const a = await session.findElement('css', '#a');
            await a.sendKeys('13');
            const b = await session.findElement('css', '#b');
            await b.sendKeys('7');
            const add = await session.findElement('css', '#add');
            await add.click();
            const result = await session.findElement('css', '#result');
            const resultText = await result.getText();
            expect(resultText).toEqual('20');
        });
    });

    describe('getCss method', () => {
        it('should return the provided style property of an element', async () => {
            const result = await session.findElement('css', '#result');
            const backgroundColor = await result.getCss('background-color');
            expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        });
    });
});
