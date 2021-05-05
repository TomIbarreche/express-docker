pipeline {
    agent any
    tools {
        dockerTool 'Docker'
    }
    environment {
        NEW_VERSION = '1.3.0'
    }
    stages {
        stage("build") {
            steps {
                sh "docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build "
            }
        }

        stage("test") {
            when {
                expression {
                    BRANCH_NAME == 'develop' ||BRANCH_NAME == 'main'
                }
            }
            steps {
                echo "esting with"
            }
        }
    }
}
