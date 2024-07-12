
import React from 'react';
import NextHead from 'next/head';

interface IProps{
    title?: string
}
const Head:React.FC<IProps> = ({ title }) => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={"thm store enjoy live music"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
    </NextHead>
);

export default Head