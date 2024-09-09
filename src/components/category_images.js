import billImage from "../assets/bill.png";
import entertainmentImage from "../assets/entertainment.png";
import foodImage from "../assets/food.png";
import grocriesImage from "../assets/grocries.png";
import healthImage from "../assets/health.png";
import transportImage from "../assets/transport.png";

export function getImage(category) {
    if (category == "bills") {
      return billImage;
    }
    if (category == "entertainment") {
      return entertainmentImage;
    }
    if (category == "food") {
      return foodImage;
    }
    if (category == "groceries") {
      return grocriesImage;
    }
    if (category == "health") {
      return healthImage;
    }
    if (category == "transport") {
      return transportImage;
    }
  }