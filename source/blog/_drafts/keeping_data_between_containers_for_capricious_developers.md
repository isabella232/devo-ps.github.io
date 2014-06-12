---
draft: true

title: Keeping data between containers for capricious developers

collection: blog
author: vincent
date: 2014-06-12
hn: 
---

Docker has evolved quite a lot in the past few months, from nameless containers to named ones, from little support of persistant storage to support of mounted end-points and self-generated volumes.

So what if you have a new version of your redis container? And you want to keep your data and still name it ... say ... redis ?

Docker comes with a few features and limitation that make the above a bit laborious:

- **named containers**: containers can be named anything, or get a default name provided (amazing-einstein?). It is very convenient when you try to address them without going for a long ID. But you can't use the same name twice... And you can't rename the container either...
- **Volumes migration**: containers can be built using the volumes of another container, neat for data migration! But the "source" container need to exist (stopped is ok - destroyed containers is ... not ok because it doesn't exist anymore)

So .. how to keep the same name and the same data? Use a temporary container! that does nothing but hold your data while you kill the old container and free its name!

```
# Consider the following details for your "old" container
NAME=i_like_this_name_very_much_and_i_wanna_keep_it
IMAGE=some/image
CMD=some_command

# Pull / Update your container's image
docker pull $IMAGE

# Start a temporary container that does .. nothing
docker run -d -name temp_box -volumes-from $NAME ubuntu:latest /bin/bash

# Stop and remove the original container
docker stop $NAME
docker rm $NAME

# Start the new container with the same old name
docker run -d -name $NAME -volumes-from temp_box $IMAGE $CMD

# Do some cleanup and remove the temp box as well
docker stop temp_box
docker rm temp_box
```
