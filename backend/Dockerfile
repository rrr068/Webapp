FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y vim

RUN mkdir /backend
WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler

RUN bundle install
COPY . /backend