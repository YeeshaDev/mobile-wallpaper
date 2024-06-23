import React from 'react'
import { OnboardFlow } from 'react-native-onboard'

export const onboard = () => {
  return (
    <div>
         <OnboardFlow pages={[
        {
          title: 'Welcome to my app',
          subtitle: 'Connect your bank account now and start saving money.',
          imageUri: 'https://frigade.com/img/demo.png'
        },
        {
          title: 'What is your e-mail?',
          subtitle: 'We promise not to spam ✌️',
          type: 'formEntry',
          primaryButtonTitle: 'Request access',
            props: {
                'fields': [
                    {
                        "type": "email",
                        "id": "email",
                        "placeHolder": "Email",
                        "label": "Email Address",
                        "isRequired": true
                    }
                ]
            }
        },
        {
          title: 'What\'s your full name?',
          type: 'formEntry',
          primaryButtonTitle: 'Continue',
            props: {
                'fields': [
                    {
                        "type": "text",
                        "id": "firstName",
                        "placeHolder": "First name",
                        "label": "First name",
                        "isRequired": false
                    },
                    {
                        "type": "text",
                        "id": "lastName",
                        "placeHolder": "Last name",
                        "label": "Last name",
                        "isRequired": false
                    }
                ]
            }
        },
        {
          id: 'web',
          title: 'What is your web stack?',
          subtitle: '',
          type: 'multipleChoice',
          primaryButtonTitle: 'Continue',
          props: {
              minChoices: 0,
              maxChoices: 3,
              fields: [
                  {
                      id: 'react',
                      title: 'React'
                  },
                  {
                      id: 'nextjs',
                      title: 'Next.js'
                  },
                  {
                      id: 'vue',
                      title: 'Vue'
                  },
                  {
                      id: 'gatsby',
                      title: 'Gatsby'
                  },
                  {
                      id: 'other',
                      title: 'Other'
                  }
              ]
          }
        }
      ]}
      textAlign='left'
      type='fullscreen' // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
       />
    </div>
  )
}
