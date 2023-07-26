# Relayer for Keyring Credential Update


__*It is recommended to run your Relayer on a VPS instnace ([Virtual Private Server](https://njal.la/)). Ensure SSH configuration is enabled for security, you can find information about SSH keygen and management [here](https://www.ssh.com/academy/ssh/keygen).__

## Deploy with docker-compose (recommended)

*The following instructions are for Ubuntu 22.10, other operating systems may vary. These instructions include automated SSL configuration with LetsEncrypt.*

__PREREQUISITES__
1. Update core dependencies
  - `sudo apt-get update`
2. Install docker-compose
  - `curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
3. Install Docker
  - `curl -fsSL https://get.docker.com -o get-docker.sh && chmod +x get-docker.sh && ./get-docker.sh`
4. Install git
  - `sudo apt-get install git-all`
5. Install nginx
  - `sudo apt install nginx`
6. Stop apache2 instance (enabled by default)
  - `sudo systemctl stop apache2`

__FIREWALL CONFIGURATION__

_* Warning: Failure to configure SSH as the first UFW rule, will lock you out of the instance_

1. Make sure UFW is installed by running `apt update` and `apt install ufw`
2. Allow SSH in the first position in UFW by running `ufw insert 1 allow ssh`*
3. Allow HTTP, and HTTPS by running `ufw allow https/tcp/http`
4. Finalise changes and enable firewall `ufw enable`

__NETWORK DEPLOYMENT OPTIONS__

_Ethereum (eth) Goerli (geth)_

__SINGLE NETWORK DEPLOYMENT__
1. Clone the repository and enter the directory
  - `git clone https://github.com/portalgateme/portalgate-keyring-credential-relayer.git && cd portalgate-keyring-credential-relayer`
2. Clone the example enviroment file `.env.example` to configure for the perferred network
  - By default each network is preconfigured the naming of `.env.<NETWORK SYMBOL>`
  - `cp .env.example .env.eth`
  - Set `PRIVATE_KEY` for your relayer address (remove the 0x from your private key).
  - Set `ALCHEMY_PRIVATE_KEY` to your Alchemy private key
  - Set `NET_ID` and `NETWORK_NAME` to relevant ID and network name.
  - Set `VIRTUAL_HOST` and `LETSENCRYPT_HOST` to your domain address
    - add a A  record DNS record with the value assigned to your instance IP address to configure the domain
3. Uncomment the `env_file` lines (remove `# `) for the associated network services in `docker-compose.yml`
4. Build and deploy the docker source by specifying the network through `--profile <NETWORK_SYMBOL>`
  - `docker-compose --profile eth up -d`
5. Visit your domain address and check the `/status` endpoint and ensure there is no errors in the `status` field

__NGINX REVERSE PROXY__
1. Copy the pre-modified nginx policy as your default policy
  - `cp portalgate.conf /etc/nginx/sites-available/default`
2. Append the default nginx configuraiton to include streams
  - `echo "stream {  map_hash_bucket_size 128;  map_hash_max_size 128;  include /etc/nginx/conf.d/streams/*.conf; }" >> /etc/nginx/nginx.conf`
3. Create the stream configruation
  - `mkdir /etc/nginx/conf.d/streams && cp portalgate-stream.conf /etc/nginx/conf.d/streams/portalgate-stream.conf`
4. Start nginx to make sure the configuration is correct
  - `sudo systemctl restart nginx`
5. Stop nginx
  - `sudo systemctl stop nginx`

__MULTIPLE NETWORK DEPLOYMENT__
1. Setup the instructions stated to setup an nginx reverse proxy
2. Clone the example enviroment file `.env.example` for the networks of choice and configure
  - By default each network is preconfigured the naming of `.env.<NETWORK SYMBOL>`
  - `cp .env.example .env.eth`
  - Set `PRIVATE_KEY` to your relayer address (remove the 0x from your private key) to each environment file
    - *It is recommended not to reuse the same private keys for each network as a security measure*
  -  Set `ALCHEMY_PRIVATE_KEY` to your Alchemy private key
  -  Set `NET_ID` and `NETWORK_NAME` to relevant ID and network name.
  - Set `VIRTUAL_HOST` and `LETSENCRYPT_HOST` a unique subndomain for every network to each environment file
    - eg: `mainnet.example.com` for Ethereum, `goerli.example.com` for Goerli etc
    - ensure that the parent domain domain is specified first with the subdomain after sperated by a comma for SAN certificates
      - eg: `VIRTUAL_HOST=example.com,eth.example.com` and `LETSENCRYPT_HOST=example.com,eth.example.com`
    - add a A wildcard record DNS record with the value assigned to your instance IP address to configure submdomains
3. Uncomment the `env_file` lines (remove `# `) for the associated network services in `docker-compose.yml`
4. Build and deploy the docker source for the configured neworks specified via `--profile <NETWORK_SYMBOL>`
  - `docker-compose --profile eth --profile geth up -d`
5. Visit your domain addresses and check each `/status` endpoint to ensure there is no errors in the `status` fields

## Run locally

1. `npm i`
2. `cp .env.example .env`
3. Modify `.env` as needed
4. `npm run start`
5. Go to `http://127.0.0.1:8000`
6. In order to execute withdraw request, you can run following command

Relayer should return a transaction hash.

Disclaimer:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
