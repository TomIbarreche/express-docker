pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                sh 'echo yolo'
            }
        }

        stage("test") {
            when {
                expression {
                    BRANCH_NAME == 'develop' ||BRANCH_NAME == 'main'
                }
            }
            steps {
                echo 'test'
                npm run test
            }
        }
    }
}
