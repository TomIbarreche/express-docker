pipeline {
    agent any
    tools {
        Docker
    }
    environment {
        NEW_VERSION = '1.3.0'
        SERVER_CREDENTIALS = credentials('Server-user')
    stages {
        stage("build") {
            steps {
                echo "building version ${NEW_VERSION}"
                withCredentials([
                    usernamePassword(credentials: 'Server-user', usernameVariable: USER; passwordVariable: PWD)
                ]) {
                    sh "some script ${USER} and ${PWD} && docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build "
                }
            }
        }

        stage("test") {
            when {
                expression {
                    BRANCH_NAME == 'develop' ||BRANCH_NAME == 'main'
                }
            }
            steps {
                echo "testing with ${SERVER_CREDENTIALS}"
            }
        }
    }
}
