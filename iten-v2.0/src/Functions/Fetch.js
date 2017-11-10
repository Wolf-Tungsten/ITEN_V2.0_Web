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

export async function signin(username,password){
    let data = {
        username:username,
        password:password
    };
    return await postRequests('/auth/signin',data);
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

async function command(){

}