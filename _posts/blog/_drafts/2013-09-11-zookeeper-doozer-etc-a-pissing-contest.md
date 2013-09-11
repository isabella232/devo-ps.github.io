---
published: false
category: blog
title: "ZooKeeper, Doozer And Etcd: A Pissing Contest"
author: juha
hn: 

layout: post
---

While devo.ps is fast approaching a public release, the team has been dealing with an increasing complex infrastructure. We more recently faced an interesting issue; how do you share configuration across a cluster of servers? More importantly, how do you do so in a resilient, secure, easily deployable and speedy fashion?

That's what got us to evaluate some of the options available out there; the DIY approach, ZooKeeper, Doozer and etcd. These tools all solve similar sets of problems but their approach differ quite significantly. Since we spent the time evaluating these, we thought we'd share our findings.

## ZooKeeper, the old dog

ZooKeeper is the most well known (and oldest) project we've looked into. It's used by quite a few big  companies (Rackspace, Yahoo and eBay) and feels pretty mature technology. 

*EXPLAIN WHO BUILT IT AND WHY* DONE
Link: http://developer.yahoo.com/blogs/hadoop/apache-zookeeper-making-417.html
- Build by Yahoo to reach the "ground truth"(quote from link) on the state of the cluster variables.
 - They decided to store variables in file-like folder structure that modern tools still follow.
 - Open sourced after first year (SourceForge) and later moved to Apache.

*EXPLAIN HOW IT WORKS (ROUGHLY)* DONE

When you use zookeeper to keep distributed configuration data you have cluster of zookeeper servers that communicate with each other and share the state. Cluster has one leader. Clients can connect to any server getting the most up to date data whichever server they connect to.


----

 We know it's mature technology and has been used widely by a lot of companies. However it had a few aspects that made us loose our interest on it. First of all it's Java! I actually like programming with Java, but installing the heavy java runtime just for this wasn't attractive choise for us. It's also hosted by Apache which isn't as positive thing as it used to be (link: Has the Apache Software Foundation Lost Its Way?). Zookeeper uses its own algorithm to handle distributed storage.

* **Pros**:
  - **Mature Technology**;
  - **Feature-rich**;
- **Cons**:
  * **Complex**
  * **It's... Java**

## Doozer, kinda dead

Doozer was originally developed by Heroku (at least based on this doc: link) a few years ago (link). It was one of the first practical implementations (as far as I know) of the Paxos algorithm (link). Doozer is implemented in Go, which is good because we get one binary that can run without any dependencies (this why Go is awesome for writing devops tools). 

Doozer seemed to get a warm welcome from the programming community (links?) but recently the project has seriously stagnated and fragmented. There are lots of forks with different useful features, but no active core developers that would push the project forward and merge useful features (help them out if you like Go!). 

Doozer is divided into two projects Doozerd (the server, https://github.com/ha/doozerd) and Doozer (the client, https://github.com/ha/doozerd). The deployment is relatively easy for the simple usecase, you just start the doozer servers in your servers. After starting the first server you point the following doozer servers to the existing instances creating a cluster. Clients can then get and set data connecting to any server. The operations will be very slow compared to simple databases because clster-wide consensus has to be acquired before committing the operation. This takes some time doing it over the network. Doozer user paxos algorithm was originally designed for cross-processor communication (http://en.wikipedia.org/wiki/Paxos_%28computer_science%29). 

Doozer was a step towards the right direction. It is very simple to use an setup and they even have a cool logo! After starting to use it we started to notice that it wasn't as finished as we had hoped (incomplete documentation for example) and wasn't answering our specific needs very well. For example we would need enryption at some point that doozer didn't provide.

Pros:
 - Simple to deploy (thanks to go)
 - Easy to setup and use
 - Used in production (link, link)
 Cons:
 - Stagnating and fragmented development
 - Not very finished project
 - No encryption
 - Very simple secure-word based aithentication
 - No ACL
 
 ETCD
 
 Only after lots of research and starting to use Doozer we stumbled into a new distributed configuration storage called Etcd. It had it's first release of v0.1.0 last month (Aug 2013), but despite the young age we gave it a try. It is developed by CoreOS team that is developing new innovative os for ...(todo).
 
On surface Etcd and Doozer seem very similar but clearest technical difference is that it uses aft algorithm instead of Paxos. Raft is designed to be simpler and easier to implement (https://ramcloud.stanford.edu/wiki/download/attachments/11370504/raft.pdf    http://kellabyte.com/2013/05/09/an-alternative-to-paxos-the-raft-consensus-algorithm/) than the Paxos (known to be hard to implement).

Etcd system is archtected similarly to Doozer cluster. You setup the servers pointing to eachother and state is automatically shared. It however also keeps it's data persistent (writes log and snapshots). This was valuable in our usecase because we may have single-server clusters. The security features are using CA's, certs and private keys. Setting those up takes some effort, but provides nice layer of safety.

It was lacking doozer's cool logo, but otherwise it felt very finished, at least considering its age. It is still under very active development and we even found a simple Python client binding (link) that came handy. Etcd is based on Raft protocol (link), and it offers encryption and authentication that we will eventually need. Another cool thing is that it uses http as the client interface making it useful for cases where we just want to pull a value using curl from a bash script.

Pros:
 - Simple deployment 
 - Easy to use (especially because of http interface)
 - Planned ACL implementation (there is a ticket)
 - Data persistency
  - Encryption
  - Authentication (private keys)
  - Good documentation (but not very comprehensive)
  Cons:
  - Still didn't perfectly match our usecase on how data is spread
  - Young project, interface changing changes very possible
  
  The DIY approach
  
Common approach for ops people / teams is to rely on their own systems knowledge and scripting skills to get things like this done. As principle we try to avoid this approach because it doesn't scale well and can be fragile if not done correctly. But we did consider building a complete custom solution for our configuration distribution needs. Go seemed like attractive choice because its lack of dependencies.

One nice benefit of this approach is that we can do it without adding new dependencies to the system or keeping them to the minimum at least. However since this is very security critical piece, it would take a lot of effort to implement properly.

Pros:
 - No dependencies (or at least easily controlled)
 - Custom made (fits our usecase)
 - Chance to benefit the community by open sourcing it
 Cons:
  - Lots of development costs
  - Security and distributed state hard to get right



Conclusions

In the end we decided to give etcd a try, it seems most feasible for our usecase, has active developent and seems resilient enough for us. However we'll keep in the back of our heads that we may have to write custom solution in the future when we want to do things etcd just isn't designed for. At devo.ps we like ZeroMQ and it could provide a nice base for our efforts, but we'll cross that bridge when we get to it!








These things made us think harder and look into all feasible options available. What we ome up were: Zookeeper, Doozer, ETCD and DIY approach. All listed tools try to solve very similar problem but approach it a bit differently. In addition to these we kept in mind that we could build our own system  to answer our needs (good chance to get to use Go!), that's why Heroku originally built Doozer (link).

-; the system should keep functioning in EVERY situation)
  - Security (encryption and authorization)
  - Easy deployment and minimize dependencies.
  Things of secondary importance:
   - Speed (we only have at most some hundred variables)
