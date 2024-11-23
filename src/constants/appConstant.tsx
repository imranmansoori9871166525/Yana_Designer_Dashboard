// import {RootStackParamList, RootTabParamList} from 'navigation/types';
// import {scale} from '../theme/responsiveSize';
// import {
//   BellIcon,
//   BinIcon,
//   CallEmail,
//   Cards,
//   Feedback,
//   FormClick,
//   HandShakeIcon,
//   KYCIcon,
//   LocationPin,
//   People,
//   Policies,
//   Profile,
//   Shield,
//   StarRate,
//   VideoIcon,
// } from './iconPath';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {TGetReviewMediaConfigRes} from 'types/miscTypes';

// // AUTH
// const PROMOTIONAL_PERMISSION_TEXT =
//   'Tick this box to receive promotional offers & stay connected';

// const HEADER_MAX_HEIGHT = scale(70);
// const HEADER_MIN_HEIGHT = 0;

// // BOTTOM TABS
// const BOTTOM_TABS_MAX_HEIGHT = scale(70);
// const BOTTOM_TABS_MIN_HEIGHT = 0;
// const BOTTOM_TAB_SIZE = 70;
// const BOTTOM_SHEET_MAX_HEIGHT = scale(365);

// const NO_IMAGE_URL =
//   'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

// export {
//   PROMOTIONAL_PERMISSION_TEXT,
//   HEADER_MAX_HEIGHT,
//   HEADER_MIN_HEIGHT,
//   BOTTOM_TABS_MAX_HEIGHT,
//   BOTTOM_TABS_MIN_HEIGHT,
//   BOTTOM_TAB_SIZE,
//   BOTTOM_SHEET_MAX_HEIGHT,
//   NO_IMAGE_URL,
// };

// type TMyProfileTiles = {
//   name: string;
//   icon: JSX.Element;
//   route: keyof RootStackParamList | keyof RootTabParamList;
// };

// export const MyProfileTiles: TMyProfileTiles[] = [
//   {
//     name: 'Edit Profile',
//     icon: <Profile />,
//     route: 'EditProfile',
//   },
//   {
//     name: 'My Orders',
//     icon: <FormClick />,
//     route: 'OrderStack',
//   },
//   {
//     name: 'Saved Addresses',
//     icon: <LocationPin />,
//     route: 'SavedAddress',
//   },
//   {
//     name: 'Videos',
//     icon: <VideoIcon height={scale(18)} width={scale(18)} />,
//     route: 'VideoList',
//   },
//   // {
//   //   name: 'Saved Cards',
//   //   icon: <Cards />,
//   //   route: 'MyOrders',
//   // },
//   {
//     name: 'Activate Your Warranty',
//     icon: <Shield />,
//     route: 'ClaimWarranty',
//   },
//   // {
//   //   name: 'Rate our App',
//   //   icon: <StarRate />,
//   //   route: 'RateUs',
//   // },
//   {
//     name: 'About Us',
//     icon: <People />,
//     route: 'AboutUs',
//   },
//   {
//     name: 'Contact Us',
//     icon: <CallEmail />,
//     route: 'ContactUs',
//   },
//   {
//     name: 'Policies',
//     icon: <Policies />,
//     route: 'Policies',
//   },
//   {
//     name: 'Are You a Retailer? Start your KYC',
//     icon: <KYCIcon height={scale(22)} width={scale(22)} />,
//     route: 'KYC',
//   },
//   // {
//   //   name: 'Become our Franchise Partner',
//   //   icon: <HandShakeIcon height={scale(22)} width={scale(22)} />,
//   //   route: 'RegisterFranchise',
//   // },
//   // {
//   //   name: 'Feedback',
//   //   icon: <Feedback />,
//   //   route: 'Feedback',
//   // },
//   {
//     name: 'Notification Settings',
//     icon: <BellIcon width={15} />,
//     route: 'NotificationSettings',
//   },
//   {
//     name: 'Delete Account',
//     icon: <BinIcon width={14} />,
//     route: 'DeleteAccount',
//   },
//   // {
//   //   name: 'OrderDetails',
//   //   icon: <BellIcon width={15} />,
//   //   route: 'OrderDetails',
//   // },
// ];

// export const FeedbackServices = [
//   'Order Related',
//   'App Related',
//   'Communication and services',
//   'Product Quality',
//   'Product Cost',
//   'Value for Money',
// ];

// // export const HIDE_LOADER_ENDPOINTS = [
// //   'getCountryCode',
// //   'getSearchKeywords',
// //   'getMoreFromBrandProduct',
// //   'getMoreFromCategoryProduct',
// //   // 'getProductPageData',
// //   // 'getProdRatingReview',
// //   // 'aboutUs',
// //   // 'uploadReviewMedia',
// // ] as string[];

// export const ACTION_TYPES = {
//   LOGOUT: 'LOGOUT',
// };

// export const default_mediaConfig: TGetReviewMediaConfigRes = {
//   no_of_images: 3,
//   no_of_videos: 2,
//   single_image_size: 10,
//   single_video_size: 50,
//   single_video_duration: 30,
//   unit_size: 'MB',
//   unit_duration: 'seconds',
// };
