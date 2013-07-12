---
published: false
---

## Overview

Collectd is a Unix daemon that gather monitoring data via its collection of plugins. It is very efficient, C based.
It runs on any server, can save data locally as RRD files and also send data over the network (via the network plugin).

The Collectd network plugin runs in 3 different modes;
- **client**; it sends data over to a remote server,
- **server**; it listen to data sent from remote server and consider it as a source of data
- **proxy**; basically act both as a server and a client and can receive data from a client then forward them to another server.

The network plugin also supports some authentication methods, the server stores the users / password into a simple htpasswd type of file, the client need to use a valid user / pass in order to see its data accepted;
- **None**; doesn't do nothing, data are sent and received without validation,
- **Sign**; only sign the data and ensure the data are coming from a valid host,
- **Encrypt**; send the data as encrypted over the wire, this is the most secure approach; yet the current version (4.10) on Ubuntu is buggy and encryption fails on initialization. We will need to wait for v5.2 to be available to get this fixed.

We rely on **Sign** to validate the data are coming from a good host.

Cool stuff, similar to iptables, collectd can use chains to temper with the data and perform advanced routing of the messages, filter messages, etc. We use this feature to set proper hostname (+space) over to the centralized collectd server.

## Requirements
The setup is best performed on the clients via devops-ansible (see [[Ansible]]) as the packages, templates and configuration files are automatically pushed over to the remote hosts.

On the server side an installation formula will soon be provided; manual setup is still required for the moment.

## Steps
- Install collectd

```
sudo apt-get install -y collectd
```

- Edit collectd configuration file; 
    - **Uncomment** ```LoadPlugin network```
    - At the end of the file, append the following:

```
<Plugin network>
    <Listen "SER.VER.IP.ADD" "25826">
        SecurityLevel Sign
        AuthFile "/etc/collectd/passwd"
    </Listen>
</Plugin>
```

- Create the auth file and add users

```
cat > /etc/collectd/passwd << EOF
user1: pass1
user2: pass2
EOF
```

**Note**: you can change / add password on the fly in this file without restarting collectd. This file is automatically read on change.

- Enable collectd daemon at boot and (re)start the service

```
update-rc.d collectd defaults
service collectd restart
```

## Advanced; integration with Graphite
The previous setup is a simple way to set up the collectd service to act as a network server and capture data sent from the remote clients. Data are by default wrote into RRD files located in ```/var/lib/collectd/rrd/$HOSTNAME/```.

Obviously, this step require [[Graphite]] to be installed and running. Refer to the [wiki page](https://github.com/devo-ps/api.devo.ps/wiki/Graphite) to setup your environment, and you'll see statistics of your computer.

Enjoy!
