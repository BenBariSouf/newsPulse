import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({
	name: "My app name",
	// host: '192.168.1.8'
})

	.useReactNative({
		asyncStorage: false, // there are more options to the async storage.
		networking: {
			// optionally, you can turn it off with false.
			ignoreUrls: /symbolicate/,
		},
		editor: false, // there are more options to editor
		overlay: false, // just turning off overlay
	})
	.use(reactotronRedux())
	.connect();

export default reactotron;
