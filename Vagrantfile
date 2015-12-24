# ZonamaDev Vagrantfile
#
# Author: Lord Kator <lordkator@swgemu.com>
#
# Created: Wed Dec 23 17:54:28 EST 2015
#

## Check for required plugins
plugins_installed = false

[
  { :name => "vagrant-vbguest", :version => ">= 0.11.0" },
  { :name => "vagrant-reload", :version => ">= 0.0.1" },
  { :name => "vagrant-triggers", :version => ">= 0.5.0" }
].each do |plugin|
  if not Vagrant.has_plugin?(plugin[:name], plugin[:version])
    # raise "#{plugin[:name]} #{plugin[:version]} is required. Please run `vagrant plugin install #{plugin[:name]}`"
    system("vagrant plugin install #{plugin[:name]}")
    plugins_installed = true
  end
end

# If we had to install anything they need to restart
if plugins_installed
    puts "Some plugins had to be installed, please re-run your command"
    exit 1
end

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # vbguest settings
  config.vbguest.auto_update = false
  config.vbguest.no_install = true

  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "debian/jessie64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # This keeps windows hosts from blowing their brains out about rsync missing
  config.vm.synced_folder '.', '/vagrant', :disabled => true

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
 
    # Customize the amount of memory on the VM:
    vb.memory = "2048"

    # CPU's
    vb.cpus = 2

    # Add some video memory so we can use X11
    vb.customize ["modifyvm", :id, "--vram", "256"]

    vb.name = "ZonamaDev"

    # Advanced:
    # v.linked_clone = true
  end

  # VMWARE Settings
  config.vm.provider :vmware_fusion do |vw|
    vw.memory = 2048
    vw.cpus = 2
  end

  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", name: "firstboot.sh", inline: <<-SHELL
    apt-get update
    apt-get -y install git
    git clone https://github.com/lordkator/ZonamaDev.git
    ZonamaDev/guest/firstboot.sh
    chown -vR vagrant:vagrant ~vagrant/
  SHELL

  # Make sure updated kernel is loaded etc.
  config.vm.provision :reload

  # Postponed vbguest, run it now...
  # config.vm.provision :host_shell, inline: "vagrant vbguest --do install"
  config.vm.provision :trigger, :force => true do |trigger|
    trigger.fire do
      run "vagrant vbguest --do install"
    end
  end

  config.vm.provision :reload
end
#
# -*- mode: ruby -*-
# vi: set ft=ruby:
#
