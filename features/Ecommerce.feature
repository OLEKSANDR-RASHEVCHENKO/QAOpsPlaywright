Feature: Ecommerce validation
  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "rashevchenkoo@gmail.com" and "Gazmanov1234"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order is present in the Orderhistory



  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed


    Examples:
      | username                    | password        |
      | rashevchenkoo@gmail.com     | Gazmanov1234    |
      | rashevchenk2231oo@gmail.com | Gazmanov1232234 |