export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { email: string };
  Favourites: { email: string };
  Home: { email: string };
  Members: { email: string };
  Schedule: { email: string };
  Profile: { email: string };
  HotelSearch: { email: string };
  HotelList: {
    email: string;
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  HotelDetails: {
    email: string;
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  HotelCheckout: {
    email: string;
    hotelId: string;
    nightlyPrice: number;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  BookingConfirmed: {
    email: string;
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  BookingDetails: {
    email: string;
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
};
