import '@styles/global.css';
import { Children } from 'react';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'IdeaSpark',
    description: 'Discover & Share Amazing Idea',
    icons: {
        icon: '/static/favicon.ico',
      },
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>

                    <div className="app">
                        <Nav />
                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout