import React from 'react'
import {Button} from 'antd'
import AgoraRTC from "agora-rtc-sdk-ng"

import classes from './index.less';

const rtc = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null,
};
export default class Home extends React.Component{
  state = {
    loading: false,
    statusTo: 'Join',
    mute: false
  }
  startBasicCall = async ()=>{
    this.setState({
      loading: true
    });
    // Create a local client
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  
    // Subscribe to a remote user
    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user
      await rtc.client.subscribe(user);
      console.log("subscribe success");
    
      if (mediaType === "video" || mediaType === "all") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid;
        console.log('playerContainer', playerContainer)
        playerContainer.style.width = "500px";
        playerContainer.style.height = "500px";
        
        // const videoBox = document.querySelector('.video')[0];
        const videoBox = this.refs.content;
        videoBox.appendChild(playerContainer)
  
        // Play the remote audio and video tracks
        // Pass the ID of the DIV container and the SDK dynamically creates a player in the container for playing the remote video track
        remoteVideoTrack.play(playerContainer.id);
      }
    
      if (mediaType === "audio" || mediaType === "all") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. Do not need to pass any DOM element
        remoteAudioTrack.play();
      }
    });
  
    rtc.client.on("user-unpublished", user => {
      // Get the dynamically created DIV container
      const playerContainer = document.getElementById(user.uid);
      // Destroy the container
      playerContainer.remove();
    });
  
    // Join a channel
    // const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
    const appId = '090bd398f4af418aa3de8744e5fcbcb8';
    const channel = '111';
    const token = '006090bd398f4af418aa3de8744e5fcbcb8IACP3dqCo5DX9RG7QYTgJqMFaAb2lAsMXTQRLZo5Gj6zoj1Ra00AAAAAEACVypXNtV7LXwEAAQC1Xstf';
    const uid = await rtc.client.join(appId, channel, token, null);
  
    // Create and publish the local tracks
    // Create an audio track from the audio captured by a microphone
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  
    const localPlayer = document.createElement("div");
    localPlayer.id = uid;
    localPlayer.style.width = "500px";
    localPlayer.style.height = "500px";
    const videoBox = this.refs.video;
    videoBox.appendChild(localPlayer)
    rtc.localVideoTrack.play(localPlayer.id);
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    
    this.setState({
      loading: false,
      statusTo: 'Leave'
    });
  
  }
  leaveCall = async()=>{
    this.setState({
      loading: true
    });
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    
    const localPlayer = document.getElementById(rtc.client.uid);
    localPlayer && localPlayer.remove()
  
    rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
  
    // Leave the channel
    await rtc.client.leave();
    this.setState({
      loading: false,
      statusTo: 'Join'
    });
  }
  handle = ()=>{
    if(this.state.statusTo==='Join') {
      this.startBasicCall();
    }else {
      this.leaveCall();
    }
  }
  muteToggle = () =>{
    rtc.localAudioTrack.muteAudio();  
  }
  render(){
    const { loading, statusTo } = this.state;
    return (
      <div ref="content" className={classes.content}>
        <div ref="video" className={classes.video}></div>
        <Button loading={loading} type="primary" onClick={this.handle}>
          { statusTo }
        </Button>
      </div>
    )
  }
}
