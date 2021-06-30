import React, {useEffect} from 'react';
import {useState} from 'react';
import {TextInput, View} from 'react-native';
import RtcEngine from 'react-native-agora';
import LottieView from 'lottie-react-native';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';

import Button from '../components/Button';
import {
  Microphone,
  Speaker,
  Headphone,
  Join,
  MicrophoneOff,
  JoinOff,
  Record,
} from '../components/icons';

import requestCameraAndAudioPermission from '../utils/permissions';
import {width, appId, token} from '../utils/constants';

import {Grid} from '../styles';

const Home = () => {
  const [channelName, setChannelName] = useState('one');
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(false);
  const [openMicrophone, setOpenMicrophone] = useState(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const [engine, setEngine] = useState<RtcEngine>();
  const [record, setRecord] = useState(false);

  const animation = useRef<any>();

  const init = async () => {
    const permissions = await requestCameraAndAudioPermission();

    if (permissions) {
      const locEngine = await RtcEngine.create(appId);

      if (locEngine) {
        setEngine(locEngine);
        // Enable the audio module.
        await locEngine.enableAudio();

        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        locEngine.addListener('UserJoined', (uid: any, elapsed: any) => {
          if (peerIds.indexOf(uid) === -1) {
            setPeerIds([...peerIds, uid]);
          }
        });

        // Listen for the UserOffline callback.
        // This callback occurs when the remote user leaves the channel or drops offline.
        locEngine.addListener('UserOffline', (uid: any, reason: any) => {
          // Remove peer ID from state array
          setPeerIds(peerIds.filter((id: any) => id !== uid));
        });

        // Listen for the JoinChannelSuccess callback.
        // This callback occurs when the local user successfully joins the channel.
        locEngine.addListener(
          'JoinChannelSuccess',
          (channel: any, uid: any, elapsed: any) => {
            setJoinSucceed(true);
          },
        );
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  // Pass in your token and channel name through this.state.token and this.state.channelName.
  // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
  // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
  const joinChannel = async () => {
    await engine?.joinChannel(token, channelName, null, 0);
    if (animation) {
      animation.current.play();
    }
  };

  // Turn the microphone on or off.
  const switchMicrophone = () => {
    engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        setOpenMicrophone(!openMicrophone);
      })
      .catch((err: string) => {
        console.warn('enableLocalAudio', err);
      });
  };

  // Switch the audio playback device.
  const switchSpeakerphone = () => {
    engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        setEnableSpeakerphone(!enableSpeakerphone);
      })
      .catch((err: string) => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  const recordCall = () => {
    setRecord(!record);
  };

  const leaveChannel = async () => {
    await engine?.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
    if (animation) {
      animation.current.reset();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={text => setChannelName(text)}
            placeholder={'Channel Name'}
            value={channelName}
            editable={!joinSucceed}
          />
          <Button
            onlyIcon
            onPress={joinSucceed ? leaveChannel : joinChannel}
            scale={false}>
            <View style={[styles.icon, styles.smallIcon]}>
              {!joinSucceed ? <Join /> : <JoinOff />}
            </View>
          </Button>
        </View>
      </View>
      <LottieView
        style={styles.lottie}
        ref={animation}
        source={require('../assets/lottie/phone-tap.json')}
        autoSize
        loop
      />
      <View style={styles.bottom}>
        <Button onPress={switchMicrophone} onlyIcon>
          <View style={styles.icon}>
            {openMicrophone ? <MicrophoneOff /> : <Microphone />}
          </View>
        </Button>
        <Button onPress={recordCall} onlyIcon>
          <View style={styles.icon}>
            <Record on={record} />
          </View>
        </Button>
        <Button onPress={switchSpeakerphone} onlyIcon>
          <View style={styles.icon}>
            {enableSpeakerphone ? <Speaker /> : <Headphone />}
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Grid.defaltContainer,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  bottom: {
    width,
    ...Grid.defContainerRow,
    justifyContent: 'space-around',
    borderColor: '#aab2bf',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  lottie: {
    width,
    height: width,
  },
  top: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fff',
  },
  icon: {
    ...Grid.flex,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  smallIcon: {
    width: 35,
    height: 35,
  },
  inputWrap: {
    height: 50,
    paddingVertical: 5,
    ...Grid.defContainerRowFlex,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: '#aab2bf',
    borderWidth: 1,
  },
  input: {
    color: '#fff',
    flex: 1,
  },
});

export default Home;
