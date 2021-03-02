/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import SimpleText from './SimpleText.svelte';

describe('SimpleText', () => {

    test('shows proper heading when rendered', () => {
        const { getByText } = render(SimpleText, { name: 'World' });

        expect(getByText('Hello World!')).toBeInTheDocument();
    })

    // Note: This is as an async test as we are using `fireEvent`
    test('changes button text on click', async () => {
        const { getByText } = render(SimpleText, { name: 'World' });
        const button = getByText('Button');

        expect(button).not.toHaveTextContent('Button Clicked');

        // Using await when firing events is unique to the svelte testing library because
        // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
        await fireEvent.click(button);

        expect(button).toHaveTextContent('Button Clicked');
    });
});
