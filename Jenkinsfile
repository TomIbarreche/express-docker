pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                sh 'docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up -d --build'
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
            }
        }
    }
}
