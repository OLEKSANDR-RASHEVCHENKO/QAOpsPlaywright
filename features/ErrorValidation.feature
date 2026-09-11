Feature: Ecommerce validation

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed


    Examples:
        | username                    | password       |
        | rashevchenkoo@gmail.com     | Gazmanov1234   | 
        | rashevchenk2231oo@gmail.com | Gazmanov1232234|

    #Parametrization, parallel,html reports, rerun failed tests 
    #Parametrization:Scenario Outline: and then Examples keyword