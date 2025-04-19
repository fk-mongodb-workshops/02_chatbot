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
            loading: true,
            trigger: false
        };

        this.triggerNext = this.triggerNext.bind(this);
    }

    triggerNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    componentWillMount() {
        const self = this;
        const { steps } = this.props;
        // console.log(steps)
        const userId = steps.questionuserid.value;
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
            this.triggerNext()
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

class PaymentBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: "",
            loading: true,
            trigger: false
        };

        this.triggerNext = this.triggerNext.bind(this);
    }

    triggerNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    componentWillMount() {
        const self = this;
        const { steps } = this.props;
        // console.log(steps)
        const user_id = steps.paymentuserid.value;
        const amount = parseInt(steps.amount.value);
        const user_name = steps.name.value;
        const spbu = steps.spbu.value;
        const litres = parseInt(steps.litre.value);
        const product = steps.product.value;

        const client = axios.create({
            baseURL: "https://api.linkaja.demo.karnagi.monster/pay"
        });
        client.post('', {
            amount,
            litres,
            spbu,
            product,
            user_id,
            user_name
        }).then((data) => {
            console.log(data);
            this.setState({
                loading: false,
                answer: data.data.response
            })
            this.triggerNext()
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
                                message: 'Hi there, LinkAJa Merchant Bot is here. How can I help you?',
                                trigger: 'intent',
                            },
                            {
                                id: 'intent',
                                options: [
                                    { value: 1, label: 'Ask', trigger: 'ask-userid-for-question' },
                                    { value: 2, label: 'Pay', trigger: 'ask-userid-for-payment' }
                                ],
                            },
                            {
                                id: 'ask-userid-for-question',
                                message: 'Sure, let me know your User ID?',
                                trigger: 'questionuserid',
                            },
                            {
                                id: 'questionuserid',
                                user: true,
                                trigger: 'ask-question',
                            },
                            {
                                id: 'ask-question',
                                message: 'Thank you, let me know what you would like to ask?',
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
                                waitAction: true,
                                trigger: 'ask-for-more',
                            },
                            {
                                id: 'ask-for-more',
                                message: 'Do you want to ask another question?',
                                trigger: 'ask-for-more-options'
                            },
                            {
                                id: 'ask-for-more-options',
                                options: [
                                    { value: 1, label: 'Yes', trigger: 'ask-question' },
                                    { value: 2, label: 'No', trigger: 'end' }
                                ],
                            },


                            {
                                id: 'ask-userid-for-payment',
                                message: 'Sure, let me know your User ID?',
                                trigger: 'paymentuserid',
                            },
                            {
                                id: 'paymentuserid',
                                user: true,
                                trigger: 'start-payment',
                            },
                            {
                                id: 'start-payment',
                                message: 'Thank you, let me ask you few questions',
                                trigger: 'ask-name',
                            },
                            {
                                id: 'ask-name',
                                message: 'How can I address you?',
                                trigger: 'name',
                            },
                            {
                                id: 'name',
                                user: true,
                                trigger: 'ask-spbu',
                            },
                            {
                                id: 'ask-spbu',
                                message: 'Which SPBU are you currently petrol-pumping at?',
                                trigger: 'spbu',
                            },
                            {
                                id: 'spbu',
                                options: [
                                    { value: "111111", label: '111111', trigger: 'ask-product' },
                                    { value: "111222", label: '111222', trigger: 'ask-product' },
                                    { value: "111333", label: '111333', trigger: 'ask-product' },
                                    { value: "222111", label: '222111', trigger: 'ask-product' },
                                    { value: "222222", label: '222222', trigger: 'ask-product' },
                                    { value: "222333", label: '222333', trigger: 'ask-product' }
                                ],
                            },
                            {
                                id: 'ask-product',
                                message: 'Which product are you currently petrol-pumping with?',
                                trigger: 'product',
                            },
                            {
                                id: 'product',
                                options: [
                                    { value: "RON90", label: 'RON90', trigger: 'ask-litre' },
                                    { value: "RON92", label: 'RON92', trigger: 'ask-litre' },
                                    { value: "RON95", label: 'RON95', trigger: 'ask-litre' },
                                    { value: "RON98", label: 'RON98', trigger: 'ask-litre' }
                                ],
                            },
                            {
                                id: 'ask-litre',
                                message: 'How many litres are you fueling?',
                                trigger: 'litre',
                            },
                            {
                                id: 'litre',
                                user: true,
                                trigger: 'ask-amount',
                            },
                            {
                                id: 'ask-amount',
                                message: 'How much Rupiah are you spending?',
                                trigger: 'amount',
                            },
                            {
                                id: 'amount',
                                user: true,
                                trigger: 'response-payment',
                            },
                            {
                                id: 'response-payment',
                                component: <PaymentBox />,
                                waitAction: true,
                                trigger: 'end',
                            },
                            {
                                id: 'end',
                                end: true,
                                message: 'Thank you and hope to see you again soon',
                            },
                        ]}
                    />
                </div>
            </ThemeProvider>
        );
    }
}

export default SimpleForm