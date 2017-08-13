/* eslint-env jest */

const { session } = require('./session-provider');

describe('Session', () => {
    describe('getTitle method', () => {
        it('should return page title', async () => {
            const title = await session.getTitle();
            expect(title).toEqual('The simple calculator');
        });
    });

    describe('findElement method', () => {
        it('should find element by CSS selector', async () => {
            const element = await session.findElement('css', 'h2');
            expect(element).toBeDefined();
        });
    });
});
