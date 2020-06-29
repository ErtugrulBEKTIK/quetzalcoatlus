import React, { Component,useEffect,useState } from 'react';
import { TouchableOpacity, Modal, ScrollView, View } from 'react-native';
import {Text, Body, Input, Label, Item, Form, Button, Icon, Spinner,} from "native-base";
import {res} from '~/helpers';
import {StyleSheet} from "react-native";
import axios from "~/Api";
import NavigationService from "~/NavigationService";

export default function SmsConfirmation(props) {

    const [smsCode,setSmsCode] = useState('');
    const [smsConfirm,setSmsConfirm] = useState(false);


    useEffect(() => {
        // Update the document title using the browser API

        setSmsConfirm(props.smsConfirm);

    },[props.smsConfirm]);

    async function handleSubmit() {

        var data = {username:props.userName,code:smsCode}

        console.log(JSON.stringify(data));
        try {
            const response = await axios.post('api/verificateSMS',
                data
            );
            NavigationService.navigate('SignIn');
            alert('Kayıt Başarılı');
        }catch (e) {
            console.log(e);
            alert('Kayıt başarısız tekrar deneyin.');
        }

        setSmsConfirm(false)
        props.setSignUpSmsConfirm(false)
        this.props.smsConfirm = false;
    };

    function handleChange(smsCode) {
        setSmsCode(smsCode);
    }


        return (
            <>
                <Modal visible={smsConfirm} transparent={true}>
                    <View style={s.modalContainer}>
                        <View style={s.scrollView}>
                            <Item>
                            <Input  placeholder='Sms Onay Kodu'
                                    onChangeText={(e) => handleChange(e)}
                                   // value={this.state.smsCode}
                                    style={s.smsCodeInput}
                                    keyboardType='number-pad'

                            >
                            </Input>
                            </Item>
                            <Button
                                block
                                onPress={handleSubmit}
                                style={s.button}>
                                <Text>Gönder</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </>
        );


}
const s = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'white',
        width: '80%',
        height: res(200),
        borderRadius: res(10),
        padding: res(10),
        textAlign: 'center',
        alignItems: 'center',

    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: res(5)
    },
    smsCodeInput: {
        width: '80%',
        textAlign: 'center',

    },
    button: {
        marginTop: res(30),
        backgroundColor: '#003d58',
        width: '80%',
        margin: res(25),
        borderRadius: res(5),

    },
});
