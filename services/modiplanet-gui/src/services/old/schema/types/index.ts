import {
  BoardFaqConnectionQuery,
  BoardNoticeConnectionQuery,
  CourseConnectionQuery,
  CourseQuery,
  MarketingCouponDownloadConnectionQuery,
  OrderCardsQuery,
  OrderQuery,
  OrderedCourseQuery,
  UserProfileConnectionQuery,
  UserContactConnectionQuery,
  NotificationConnectionQuery,
  ProfileConnectionQuery,
  ChallengeQuizConnectionQuery,
  ChallengeQuizQuery,
  RandomQuizQuestionQuery,
  SubmitQuestionAnswerMutation,
  QuizResultQuery,
  AiModelCategoriesQuery,
  AiModelConnectionQuery,
  BoardDataConnectionQuery,
} from '@services/old/generated/graphql';
import { AiModelQuery } from '@services/gen/gen';

// Profiles
export type TProfiles =
  UserProfileConnectionQuery['userProfileConnection']['nodes'];
export type TProfile =
  UserProfileConnectionQuery['userProfileConnection']['nodes'][0];

// user
export type TUser = ProfileConnectionQuery['user'];

// Board
export type TBoardFaq =
  BoardFaqConnectionQuery['boardFaqConnection']['nodes'][0];

export type TBoardFaqConnection =
  BoardFaqConnectionQuery['boardFaqConnection']['nodes'];

export type TBoardNoticeConnection =
  BoardNoticeConnectionQuery['boardNoticeConnection']['nodes'];
export type TBoardDataConnection =
  BoardDataConnectionQuery['boardDataConnection']['nodes'];

// Cousre
export type TConnectionCourse =
  CourseConnectionQuery['courseConnection']['nodes'][0];

export type TCourseConnection =
  CourseConnectionQuery['courseConnection']['nodes'];

export type TCourse = CourseQuery['course'];

// UserContact : 1:1문의
export type TUserContact =
  UserContactConnectionQuery['userContactConnection']['nodes'][0];

// Coupon
export type TCoupon =
  MarketingCouponDownloadConnectionQuery['marketingCouponDownloadConnection']['nodes'][0];

// Pay Cards
export type TPayCards = OrderCardsQuery['orderCards'];
export type TPayCard = OrderCardsQuery['orderCards'][0];

// Order 관련

export type TOrder = OrderQuery['order'];
export type TOrderedCourse = OrderedCourseQuery['course'];
export type TOrderedMerchandise =
  OrderedCourseQuery['course']['merchandises'][0];

export type TOrderItems = TOrder['orderItems'];
export type TOrderItem = TOrderItems[0];
export type TCouponDiscount = TOrder['couponDiscount'];
export type TOrderPayment = TOrder['payments'][0];
export type TOrderUserInfo = TOrder['userInfo'];
export type TTOrderProfileInfo = TOrder['profileInfo'];

// Notification
export type TNotificationConnection =
  NotificationConnectionQuery['notificationConnection']['nodes'];

//Challenge Quiz
export type TChallengeQuizConnection =
  ChallengeQuizConnectionQuery['quizConnection']['nodes'];

export type TChallengeQuiz = ChallengeQuizQuery['quiz'];

export type TChallengeQuizQuestion = TChallengeQuiz['questions'][0];

export type TRandomQuestion = RandomQuizQuestionQuery['randomQuizQuestion'];

export type TRandomQuestionResult =
  SubmitQuestionAnswerMutation['submitQuestionAnswer'];

export type TQuizResult = QuizResultQuery['quizResult'];

//AI Model
export type TAIModelCategories = AiModelCategoriesQuery['aiModelCategories'];

// My AI Model
export type TAiModelConnection =
  AiModelConnectionQuery['aiModelConnection']['nodes'];

export type TAiModel = AiModelQuery['aiModel'];
