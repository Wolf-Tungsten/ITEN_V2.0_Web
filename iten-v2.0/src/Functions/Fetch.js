/**
 * Created by WolfTungsten on 2017/11/10.
 */
import qs from 'qs'
import axios from 'axios'

async function getRequests(url, param){
    let res = await axios.get(url, {
        params:param
    });
    return res.data;
}

async function postRequests(url, data){
    data = qs.stringify(data);
    let res = await axios.post(url, data);
    return res.data;

}



export async function signin(username,password,geetest_challenge,geetest_validate,geetest_seccode){
    let data = {
        username:username,
        password:password,
        geetest_challenge: geetest_challenge,
        geetest_validate: geetest_validate,
        geetest_seccode: geetest_seccode
    };
    return await postRequests('/auth/websignin',data);
}

export async function getUserInfo(){
    return getRequests('/auth/info');

}

export async function getVideoList(){
    let res = await getRequests('/video/playback');
    return res.video_list;
}

export async function getStatus(){
    return await getRequests('/hardware/state');
}

export async function getTrainModeList(){
    let res = await getRequests('/trainmode/available');
    return res.available_list;
}

export async function getAvailableMachine(){
    let res = await getRequests('/hardware/available');
    return res.list;
}

export async function deploy(machine_id, train_id, train_amount){
    const data = {
        machine_id, train_id, train_amount
    };
    return await postRequests('/hardware/deploy',data)
}

export async function pause(){
    await postRequests('/hardware/pause')
}

export async function resume(){
    await postRequests('/hardware/resume')
}

export async function stop(){
    await postRequests('/hardware/stop')
}

export async function geetest(){
    return await getRequests('/auth/geetest',{user_name:'iten'})
}

export async function sms(phone_number, username, geetest_challenge, geetest_validate, geetest_seccode){
    return await postRequests('/auth/sms',{
        username:username,
        phone_number:phone_number,
        geetest_challenge: geetest_challenge,
        geetest_validate: geetest_validate,
        geetest_seccode: geetest_seccode})
}

export async function signup(username, password, phone_number, sms_token){
    const data = {
        username, password, phone_number, sms_token
    };
    return await postRequests('/auth/signup', data)
}

async function command(){

}