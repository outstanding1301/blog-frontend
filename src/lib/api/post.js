import client from '@lib/client';

export const post = ({title, contents}) => {
    console.log(title);
    console.log(contents);
    return client.post('/post', {
        title, contents
    });
}