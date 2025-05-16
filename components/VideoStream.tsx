import { useEvent, useEventListener } from "expo";
import {
  PlayerError,
  useVideoPlayer,
  VideoPlayerStatus,
  VideoView,
} from "expo-video";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import thumbnailSource from "@/assets/images/thumbnail.jpg";

const videoSource = "https://mizoram.walgi.in/index.m3u8";

export default function VideoScreen() {
  const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>();
  const [playerError, setPlayerError] = useState<PlayerError>();

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEventListener(player, "statusChange", ({ status, error }) => {
    setPlayerStatus(status);
    setPlayerError(error);
  });

  const handleRetry = () => {
    setPlayerError(undefined);
    player.play();
  };

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={styles.video}
      />

      {/* Thumbnail + Loader when loading */}
      {playerStatus === "loading" && !playerError && (
        <>
          <View style={styles.thumbnailWrapper}>
            <Image
              source={thumbnailSource}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </View>
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </>
      )}

      {/* Error UI like Netflix */}
      {playerError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>
            Something went wrong. Please retry.
          </Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "white",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: "black",
    fontWeight: "bold",
  },
});
