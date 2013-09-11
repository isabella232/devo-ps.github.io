---
published: false
category: blog
title: "ZooKeeper, Doozer And Etcd: A Pissing Contest"
author: juha
hn: 

layout: post
---

While devo.ps is fast approaching a public release, the team has been dealing with an increasingly complex infrastructure. We more recently faced an interesting issue; how do you share configuration across a cluster of servers? More importantly, how do you do so in a resilient, secure, easily deployable and speedy fashion?

That's what got us to evaluate some of the options available out there; the DIY approach, ZooKeeper, Doozer and etcd. These tools all solve similar sets of problems but their approach differ quite significantly. Since we spent the time evaluating these, we thought we'd share our findings.

## ZooKeeper, the old dog

ZooKeeper is the most well known (and oldest) project we've looked into. It's used by a few big players (Rackspace, Yahoo, eBay) and is pretty mature.

ZooKeeper  was built by Yahoo to deal with distributed systems applications. I strongly recommend you [read the "making of"](http://developer.yahoo.com/blogs/hadoop/apache-zookeeper-making-417.html) if you're interested in understanding were Yahoo came from when they wrote it. 

It stores variables in a structure similar to a file system, an approach that both Doozer and etcd still follow. With ZooKeeper, you maintain a cluster of servers communicating with each other that share the state of the distributed configuration data. Each cluster elects one "leader" and clients can connect to any of the servers within the cluster to retrieve the data.

We know it's mature technology and has been used widely by a lot of companies. However it had a few aspects that made us loose our interest on it. First of all it's Java! I actually like programming with Java, but installing the heavy java runtime just for this wasn't attractive choise for us. It's also hosted by Apache which isn't as positive thing as it used to be (link: Has the Apache Software Foundation Lost Its Way?). Zookeeper uses its own algorithm to handle distributed storage.

* **Pros**:
  - **Mature technology**; it is, after all, used by some of the largest Internet companies (eBay, Yahoo et al).
  - **Feature-rich**; lots of client bindings, tools, API...
- **Cons**:
  * **Complex**; ZooKeeper is not for the faint of heart. It is pretty heavy and will require you to maintain a fairly large stack.
  * **It's... Java**; not that we especially hate Java, but it is on the heavy side and introduce a lot of dependencies. We wanted to keep our machines as lean as possible.
  * **Apache...**; we have a ambiguous feeling with the Apache Foundation. ["Has Apache Lost Its Way?"](http://www.infoworld.com/d/open-source-software/has-apache-lost-its-way-225267) summarizes it pretty well.

## Doozer, kinda dead

[Doozer](https://github.com/ha/doozerd) was developed by Heroku a few years ago. It is written in Go (yay!), which means it is compiled into a single binary that runs without dependencies. On a side-note, if you're writing code to manage infrastructure, you should spend some time learning Go.

Doozer got some initial excitement from the developer community but seemed to have stalled more recently, with many forks being sporadically maintained and no active core development.

Doozer is composed of [a daemon](https://github.com/ha/doozerd) and [a client](https://github.com/ha/doozer). Once you got at least one Doozer server up, you can add any number of server to the cluster by pointing them at one of the members. Clients can then get and set data by talking to any of the servers.

It was one of the first practical implementations (as far as I know) of the [Paxos algorithm](http://en.wikipedia.org/wiki/Paxos_(computer_science)), which means operations can be slow when compared to dealing with a straight database because cluster-wide consensus needs to be reached before committing any operation. 

Doozer was a step in the right direction. It is simple to use and setup, but after using it for a while we started noticing that a lot of its part felt unfinished and wasn't answering our specific needs very well (encryption, ACL...).

* **Pros**:
  * **Easy to deploy, setup and use** (Go, yay!)
  * **It works**; lots of people have actually used it in production.
* **Cons**:
  * **Pretty much dead**: the core project hasn't been active in a while (1 commit since May) and is pretty fragmented (150 forks...).
  * **Security**; no encryption and fairly simple secure-word based authentication.
  * **No ACL**; and we badly needed this.
 
 ## etcd 
 
While Doozer we stumbled into a new distributed configuration storage called [etcd](https://github.com/coreos/etcd). It had it's first release of v0.1.0 last month (Aug 2013), but despite the young age we gave it a try. It is developed by CoreOS team that is developing new innovative os for ...(todo).
 
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
