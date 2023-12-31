import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

interface NavigationHeaderProps {
  onPress: () => void;
  isShare?: boolean;
  isBookmark?: boolean;
  onPressShare?: () => void;
  onPressBookmark?: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onPress, onPressBookmark, onPressShare, isBookmark = false, isShare = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={styles.container}>
      <Ionicons name='arrow-back-sharp' color={COLORS.WHITE_COLOR} size={wp(22)} onPress={onPress} />

      <View style={styles.rightIconContainer}>
        {isBookmark && (
          <Ionicons
            name={!isBookmarked ? "ios-bookmark-outline" : "ios-bookmark"}
            color={COLORS.WHITE_COLOR}
            size={wp(20)}
            onPress={() => {
              onPressBookmark();
              setIsBookmarked(!isBookmarked);
            }}
          />
        )}
        {isShare && <Ionicons name='ios-share-outline' color={COLORS.WHITE_COLOR} size={wp(20)} onPress={onPressShare} style={{ marginLeft: wp(12) }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(52),
    marginTop: wp(8),
    width: DEVICE_WIDTH,
    paddingHorizontal: wp(20),
    backgroundColor: COLORS.RED_COLOR,
    alignItems: "center",
  },
  rightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NavigationHeader;
