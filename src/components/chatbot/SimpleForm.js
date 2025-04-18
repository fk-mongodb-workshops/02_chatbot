import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

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

class ResponseBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: "",
            loading: true
        };

        // this.triggetNext = this.triggetNext.bind(this);
    }

    componentWillMount() {
        const self = this;
        const { steps } = this.props;
        // console.log(steps)
        const userId = steps.userid.value;
        const question = steps.question.value;

        const client = axios.create({
            baseURL: "https://api.linkaja.demo.karnagi.monster/ask"
        });
        client.post('', {
            "user_id": userId,
            "question": question
        }).then((data) => {
            console.log(data);
            this.setState({
                loading: false,
                answer: data.data.response
            })
        });
    }

    render() {

        const { answer, loading } = this.state;

        return <>
            {
                loading ? <Loading /> :
                    <div>
                        {answer}
                    </div>
            }
        </>

    }
}

class SimpleForm extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <ChatBot
                        handleEnd={this.handleEnd}
                        headerTitle="LinkAja Merchant Bot"
                        steps={[
                            {
                                id: 'intro',
                                message: 'Hi there, LinkAJa Merchant Bot is here. I am here to assist you with question about fuel spending in Pertamina.',
                                trigger: 'ask-userid',
                            },
                            {
                                id: 'ask-userid',
                                message: 'First of all, let me know your User ID?',
                                trigger: 'userid',
                            },
                            {
                                id: 'userid',
                                user: true,
                                trigger: 'ask-question',
                            },
                            {
                                id: 'ask-question',
                                message: 'Hi {previousValue}, let me know what you would like to ask?',
                                trigger: 'question',
                            },
                            {
                                id: 'question',
                                user: true,
                                trigger: 'response-spending',
                            },
                            {
                                id: 'response-spending',
                                component: <ResponseBox />,
                                // waitAction: true,
                                end: true
                            }
                        ]}
                    />
                </div>
            </ThemeProvider>
        );
    }
}

export default SimpleForm;