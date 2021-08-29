galhardoapp_mongoexpress:
    image: mongo-express
    restart: always
    container_name: galhardoapp_mongoexpress
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: secret
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: secret
      ME_CONFIG_MONGODB_SERVER: galhardoapp_mongodb
