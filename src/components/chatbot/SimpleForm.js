import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// all available theme props
const theme = {
    background: '#eeeeee',
    fontFamily: 'Arial',
    headerBgColor: '#e7292b',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#e7292b',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

class SimpleForm extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <ChatBot
                        headerTitle="LinkAja Merchant Bot"
                        steps={[
                            {
                                id: 'intro',
                                message: 'Hi there, LinkAJa Merchant Bot is here. Let me know what you would like ask.',
                                trigger: 'ask-options',
                            },
                            {
                                id: 'ask-options',
                                options: [
                                    { value: 'fieldgas', label: 'About fuel and gas', trigger: 'fuelgas-response' },
                                    { value: 'merchant', label: 'About merchant', trigger: 'merchant-response' },
                                ],

                            },
                            {
                                id: 'fuelgas-response',
                                message: 'No worries, tell me more about what you wanna know on fuel and gas',
                                trigger: 'ask-fieldgas',
                            },
                            {
                                id: 'merchant-response',
                                message: 'Go head, tell me more about what you wanna know about merchant',
                                trigger: 'ask-merchant',
                            },
                            {
                                id: 'ask-fieldgas',
                                user: true, 
                                trigger: 'response-fieldgas',
                            },
                            {
                                id: 'ask-merchant',
                                user: true,
                                trigger: 'response-merchant',
                            },
                            {
                                id: 'response-fieldgas',
                                message: 'We will get back to you on your query',
                                end: true,
                            }, 
                            {
                                id: 'response-merchant',
                                message: 'We will get back to you on your query',
                                end: true,
                            },
                        ]}
                    />
                </div>
            </ThemeProvider>
        );
    }
}

export default SimpleForm;